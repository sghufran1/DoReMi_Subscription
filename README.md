Context:

DoReMi is a streaming app which allows users to listen to music, podcasts and watch videos. They offer different subscription plans for different categories of services. Users can subscribe to any of these plans.

> A user can choose only one plan per category. 
> All plans, by default, can only be streamed on one device. 

 Music streaming subscription plans:
 
 |------------------------|-----------------------|-------------------------|
 |        FREE            |        PERSONAL       |         PREMIUM         |
 |------------------------|-----------------------|-------------------------|
 |    1 month Trial       |   Rs.100 for 1 month  |   Rs. 250 for 3 months  |
 |------------------------|-----------------------|-------------------------|

  Video streaming subscription plans:
  
 |------------------------|-----------------------|-------------------------|
 |        FREE            |        PERSONAL       |         PREMIUM         |
 |------------------------|-----------------------|-------------------------|
 |    1 month Trial       |   Rs.200 for 1 month  |   Rs. 500 for 3 months  |
 |------------------------|-----------------------|-------------------------|

  Podcast streaming subscription plans:
  
 |------------------------|-----------------------|-------------------------|
 |        FREE            |        PERSONAL       |         PREMIUM         |
 |------------------------|-----------------------|-------------------------|
 |    1 month Trial       |   Rs.100 for 1 month  |   Rs. 300 for 3 months  |
 |------------------------|-----------------------|-------------------------|


Top Up:
 
 DoReMi allows users to add a top up to increase the number of devices that they can stream to for an additional cost.
 
> A user can choose only one top up.  
> The subscribed top up is applicable for all subscriptions. 
> A top up can be added only when a subscription exists.

 |--------------------------------------------------------------------------|
 |              FOUR_DEVICE           |               TEN_DEVICE            |
 |------------------------------------|-------------------------------------|
 |            Upto 4 Devices          |             Upto 10 Devices         |
 |------------------------------------|-------------------------------------|
 |   Total cost: Rs.50 for 1 month    |    Total cost: Rs.100 for 1 month   |
 |------------------------------------|-------------------------------------|


 Renewal Reminder:

> Once a user subscribes to a plan, the user needs to be notified 10 days before the plan expires. 

Goal:
 
 Given a date when the subscription starts, your program should print: 
 
> The date on which the reminder should be sent for each subscription category 
> The total amount for renewal. Renewal amount is the sum of all the subscription plan amount and top up amount. 

Assumptions:
> A user can buy only one category of subscription at a time. 
> By default all plans can only be streamed on one device.
> A user can buy only one category of top up at a time. 
> One top up applies to all the subscriptions being bought. 
----------------------------------------------------------------------------------------------------------------------------------------
Input Commands & Format:

> The program should take as input the start date for subscriptions, subscriptions plans to be added, top up to be added.
 
START_SUBSCRIPTION DD-MM-YYYY

ADD_SUBSCRIPTION SUBSCRIPTION_CATEGORY PLAN_NAME 

ADD_TOPUP TOP_UP_NAME NO_OF_MONTHS 

PRINT_RENEWAL_DETAILS 

Examples :

 START_SUBSCRIPTION 20-02-2022 
 
 ADD_SUBSCRIPTION MUSIC  PERSONAL 
 
 ADD_SUBSCRIPTION VIDEO PREMIUM 
 
 ADD_TOPUP ADD_TOPUP 
 
 PRINT_RENEWAL_DETAILS 

----------------------------------------------------------------------------------------------------------------------------------------
Output Commands & Format:
 
 The program should print the renewal date for each subscription category and the total renewal amount on executing the command PRINT_RENEWAL_DETAILS.
 
RENEWAL_REMINDER SUBSCRIPTION_CATEGORY DD-MM-YYYY 

RENEWAL_AMOUNT AMOUNT 

Examples :

 RENEWAL_REMINDER MUSIC 10-03-2022  
 
 RENEWAL_REMINDER VIDEO 10-05-2022 
 
 RENEWAL_AMOUNT 700 

----------------------------------------------------------------------------------------------------------------------------------------

Sample Input/Output 1:

INPUT:

START_SUBSCRIPTION 20-02-2022

ADD_SUBSCRIPTION MUSIC PERSONAL

ADD_SUBSCRIPTION VIDEO PREMIUM

ADD_SUBSCRIPTION PODCAST FREE

ADD_TOPUP FOUR_DEVICE 3

PRINT_RENEWAL_DETAILS

OUTPUT:

RENEWAL_REMINDER MUSIC 10-03-2022

RENEWAL_REMINDER VIDEO 10-05-2022

RENEWAL_REMINDER PODCAST 10-03-2022

RENEWAL_AMOUNT 750

EXPLANATION:

Music Streaming for 1 Month [Personal plan]        -    100

Video Streaming  for 3 Month [Premium plan]        -    500

Podcast Streaming  for 1 Month Trial [Free plan]    -    0

FOUR_DEVICE’s for 3 months (50 X 3)                -    150

Total                                              -    750

----------------------------------------------------------------------------------------------------------------------------------------

Error Scenarios:

 When a user adds the same category of subscription or top up twice or more, error_code should be printed. Error code should be printed when the date format is wrong.
 
 Error Scenarios & Error Codes :
> Input 1:

START_SUBSCRIPTION 07-19-2022

ADD_SUBSCRIPTION MUSIC PREMIUM

> Output 1:

INVALID_DATE

-------------------------------------------------------------------------
> Input 2:

PRINT_RENEWAL_DETAILS

(when no subscriptions found)

> Output 2:

SUBSCRIPTIONS_NOT_FOUND

-------------------------------------------------------------------------
> Input 3:

ADD_SUBSCRIPTION MUSIC PERSONAL

ADD_SUBSCRIPTION MUSIC PREMIUM

> Output 3:

ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY

-------------------------------------------------------------------------
> Input 4:

START_SUBSCRIPTION 07-01-2022

ADD_SUBSCRIPTION MUSIC PERSONAL

ADD_TOPUP TEN_DEVICE 2

ADD_TOPUP FOUR_DEVICE 1

> Output 4:

ADD_TOPUP_FAILED DUPLICATE_TOPUP

-------------------------------------------------------------------------
> Input 5:

START_SUBSCRIPTION 07-01-2022

ADD_TOPUP TEN_DEVICE 2

PRINT_RENEWAL_DETAILS

> Output 5:

ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND

SUBSCRIPTIONS_NOT_FOUND

----------------------------------------------------------------------------------------------------------------------------------------
Instructions:

 • All input commands are to be read from a file(./src/Inputs/input1.txt) - (update input in this file one at a time and run npm install again), and output is to be printed to the console.
 
 • Command to build after updating input - npm install
 
 • Command to run the program and print output to console - npm start
 
 • Command to run tests - npm test
