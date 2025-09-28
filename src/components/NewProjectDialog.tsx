import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, 
  MapPin, 
  Leaf, 
  Waves, 
  Shield,
  Calendar,
  FileText,
  DollarSign
} from 'lucide-react';

const projectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  type: z.enum(['mangrove', 'seagrass', 'saltmarsh', 'tidal_wetland'], {
    required_error: 'Please select a project type',
  }),
  location: z.string().min(5, 'Location must be at least 5 characters'),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  area: z.number().min(0.1, 'Area must be at least 0.1 hectares'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  methodology: z.enum(['vcs', 'gold_standard', 'climate_action_reserve', 'verified_carbon_standard'], {
    required_error: 'Please select a carbon methodology',
  }),
  startDate: z.string().min(1, 'Start date is required'),
  estimatedCredits: z.number().min(1, 'Estimated credits must be at least 1'),
  budget: z.number().min(100, 'Budget must be at least $100'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  coordinates: { latitude: number; longitude: number };
  area: number;
  description: string;
  methodology: string;
  startDate: string;
  estimatedCredits: number;
  budget: number;
  status: 'active' | 'verified' | 'pending';
  credits: number;
  ndvi: number;
  lastUpdate: string;
  createdBy?: string;
  organization?: string;
}

interface NewProjectDialogProps {
  children?: React.ReactNode;
  onProjectCreated?: (project: Project) => void;
}

const projectTypes = [
  {
    value: 'mangrove',
    label: 'Mangrove Restoration',
    icon: <Leaf className="w-4 h-4" />,
    description: 'Coastal mangrove forest restoration and conservation',
    color: 'bg-forest',
  },
  {
    value: 'seagrass',
    label: 'Seagrass Conservation',
    icon: <Waves className="w-4 h-4" />,
    description: 'Underwater seagrass meadow restoration',
    color: 'bg-ocean',
  },
  {
    value: 'saltmarsh',
    label: 'Salt Marsh Protection',
    icon: <Shield className="w-4 h-4" />,
    description: 'Tidal salt marsh ecosystem restoration',
    color: 'bg-emerald-600',
  },
  {
    value: 'tidal_wetland',
    label: 'Tidal Wetland',
    icon: <MapPin className="w-4 h-4" />,
    description: 'Comprehensive tidal wetland restoration',
    color: 'bg-blue-600',
  },
];

const methodologies = [
  {
    value: 'vcs',
    label: 'Verified Carbon Standard (VCS)',
    description: 'Most widely used voluntary GHG program',
  },
  {
    value: 'gold_standard',
    label: 'Gold Standard',
    description: 'High-quality carbon credits with co-benefits',
  },
  {
    value: 'climate_action_reserve',
    label: 'Climate Action Reserve',
    description: 'North American carbon offset registry',
  },
  {
    value: 'verified_carbon_standard',
    label: 'Verified Carbon Standard',
    description: 'Comprehensive carbon accounting standard',
  },
];

export const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ 
  children, 
  onProjectCreated 
}) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      location: '',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      area: 0,
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      estimatedCredits: 0,
      budget: 0,
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProject: Project = {
        id: `BC${Date.now()}`,
        name: data.name,
        type: data.type,
        location: data.location,
        coordinates: {
          latitude: data.coordinates?.latitude || 0,
          longitude: data.coordinates?.longitude || 0,
        },
        area: data.area,
        description: data.description,
        methodology: data.methodology,
        startDate: data.startDate,
        estimatedCredits: data.estimatedCredits,
        budget: data.budget,
        status: 'pending' as const,
        credits: 0,
        ndvi: 0,
        lastUpdate: new Date().toISOString(),
        createdBy: user?.id || '',
        organization: user?.organization || '',
      };

      toast({
        title: 'Project Created Successfully!',
        description: `${data.name} has been added to your portfolio.`,
      });

      onProjectCreated?.(newProject);
      setOpen(false);
      setStep(1);
      form.reset();
    } catch (error) {
      toast({
        title: 'Error Creating Project',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {type.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your blue carbon project..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about restoration goals, methods, and expected outcomes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Florida Keys, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="coordinates.latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.000001"
                        placeholder="e.g., 25.7617"
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coordinates.longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.000001"
                        placeholder="e.g., -80.1918"
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Area (hectares) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="e.g., 45.2"
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Total area covered by the restoration project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="methodology"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carbon Methodology *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select carbon methodology" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {methodologies.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          <div>
                            <div className="font-medium">{method.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {method.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedCredits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Credits (tCO₂e) *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="e.g., 1250"
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Budget (USD) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="e.g., 50000"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Estimated total budget for project implementation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-ocean hover:bg-ocean-dark">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-forest" />
            Create New Blue Carbon Project
          </DialogTitle>
          <DialogDescription>
            Set up a new blue carbon restoration project for monitoring and carbon credit generation.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? 'bg-ocean text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {stepNumber}
              </div>
              <div className="ml-2 text-sm">
                {stepNumber === 1 && 'Basic Info'}
                {stepNumber === 2 && 'Location'}
                {stepNumber === 3 && 'Details'}
              </div>
              {stepNumber < 3 && (
                <div className="w-12 h-px bg-muted ml-4" />
              )}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}

            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-forest hover:bg-forest/90">
                    Create Project
                  </Button>
                )}
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;