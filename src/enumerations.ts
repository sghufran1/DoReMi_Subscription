export enum ClassName {
    Subscriptions = 'Subscriptions',
    TopUps = 'TopUps'
}

export enum CommandType {
    START_SUBSCRIPTION = 'START_SUBSCRIPTION',
    ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION',
    ADD_TOPUP = 'ADD_TOPUP',
    PRINT_RENEWAL_DETAILS = 'PRINT_RENEWAL_DETAILS'
  }


export enum SubscriptionType {
    MUSIC = 'MUSIC',
    VIDEO = 'VIDEO',
    PODCAST = 'PODCAST'
  }


export enum SubscriptionPlan {
    FREE = 'FREE',
    PERSONAL = 'PERSONAL',
    PREMIUM = 'PREMIUM'
  }


export enum TopUpPlan {
    FOUR_DEVICE = 'FOUR_DEVICE',
    TEN_DEVICE = 'TEN_DEVICE'
  }