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

const CustomStepIcon = (props: StepIconProps & { index: number; activeStep: number }) => {
    const { active, completed, className, index, activeStep } = props;
    let color = '#e0e0e0'; 
    if (active || completed) {
        color = 'green'; 
    }
    if (index === 1 && activeStep === 1) {
        color = 'red'; 
    }


    let IconComponent = CheckCircleIcon;
    if (index === 1) {
        IconComponent = CancelIcon;
    } else if (index === 0) {
        IconComponent = ShoppingCartIcon;
    } else if (index === 2) {
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
        { label: 'Order Placed' },
        ...(activeStep === 1 ? [{ label: 'Cancelled' }] : []),
        { label: 'Shipped' },
        { label: 'Delivered' },
    ];
  
    const filteredSteps = activeStep === 1 ? steps.slice(0, 2) : steps;
    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel >
            {filteredSteps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel
                            StepIconComponent={(props) => <CustomStepIcon {...props} index={index} activeStep={activeStep} />}
                            style={{
                                color: index === 1 && activeStep === 1 ? 'red' : 'inherit' // Change label color for cancelled step
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
