import React from 'react';
import { Stepper, Step, StepLabel, Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { StepIconProps } from '@mui/material/StepIcon';


interface OrderStatusProps {
    activeStep: number;
}

const CustomStepIcon = (props: StepIconProps & { index: number; activeStep: number,step :any}) => {
    const { active, completed, className, index, activeStep,step} = props;

    let color = '#e0e0e0'; // Default color
    if (active || completed) {
        color = 'green'; // Green for active or completed steps
    }
    if (step.id === 4 && activeStep === 3) {
        color = 'red'; // Red for "Cancelled" step when activeStep is 3
    }

    let IconComponent = CheckCircleIcon; // Default icon
    if (step.id === 4 && activeStep === 3) {
        IconComponent = CancelIcon;
    } else if (step.id === 1) {
        IconComponent = ShoppingCartIcon;
    } else if (step.id === 2) {
        IconComponent = LocalShippingIcon;
    }



    return (
        <IconComponent
            className={className}
            style={{ color }}
        />
    );
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ activeStep }) => {
    const steps = [
        { id: 1, label: 'Order Placed' },
        { id: 2, label: 'Shipped' },
        { id: 3, label: 'Delivered' },
        { id: 4, label: 'Cancelled' },
    ];


    let finalSteps;
    if (activeStep === 3) {
        finalSteps = steps.filter(step => step.id !== 2 && step.id !== 3);
    } else {
        finalSteps = steps.filter(step => step.id !== 4); 
    }


    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel >
            {finalSteps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel
                            StepIconComponent={(props) => <CustomStepIcon {...props} index={index} activeStep={activeStep} step ={step} />}
                            style={{
                                color: step.id === 4 && activeStep === 3 ? 'red' : 'inherit' 
                            }}
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};
