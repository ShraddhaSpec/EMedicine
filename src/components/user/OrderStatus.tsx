import React from 'react';
import { Stepper, Step, StepLabel, Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StepIconProps } from '@mui/material/StepIcon';

// Custom Step Icon Component
const CustomStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
        <CheckCircleIcon
            className={className}
            style={{
                color: active || completed ? 'green' : '#e0e0e0', // Green for active/completed
            }}
        />
    );
};

// Steps data
const steps = [
    { label: 'Order Placed' },
    { label: 'Shipped' },
    { label: 'Delivered' },
];

// Define the component props type
interface OrderStatusProps {
    activeStep: number;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ activeStep }) => {
    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel >
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel StepIconComponent={CustomStepIcon}>
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};
