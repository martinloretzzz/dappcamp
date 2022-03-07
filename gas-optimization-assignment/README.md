# Gas Optimization

## Goal

The goal of this exercise is to optimize contracts for minimal gas usage. This assignment contains 3 tasks in form of gas optimization examples. For each task your goal is to reduce the gas usage as much as possible

## Steps

- Optimize each contract in `contracts/` directory by making changes in the same file

## What each contract does?

- `Example1`
    - Stores certain variables such as `day`, `amount` and `ownerAddr`
- `Example2`
    - Stores a state variable `counter`. Function `incrementBy` takes in an array and adds each element of this array to counter variable
- `Example3`
    - Stores a state variable `marginPercentage`. Function `getOwnerMargin` takes in an amount and returns respective amounts for owner and sender

## Evaluation

-   Create a fork of this repo
-   Create a new branch with your name. You can use the following command

    ```
    git checkout -b my-name
    ```

-   Install all dependencies
    ```
    npm install
    ```
-   Make changes to contracts in this directory - `contract/`. The tests in `test/` directory should run successfully.

-   Run Tests
    ```
    npm test
    ```
-   Create a pull request from your forked repo to main branch of original repo to run the github workflow.