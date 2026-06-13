export interface PlanFeature {
    planFeatureId: string;
    label: string;
}

export interface Subscription {
    planId: string;
    name: string;
    description: string;
    code: string;
    amount: number;
    currencyId: string;
    intervalPeriod: number;
    duration: number;
    isFree: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    features: PlanFeature[];
}

export interface GetAllSubscriptionsResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: Subscription[];
}
