# Deploying mdEditor to your GitHub Pages

This document will summarize the steps needed to deploy an instance of mdEditor to your personal GitHub Pages account.

# Steps

  - Clone the [mdEditor repository](https://github.com/adiwg/mdEditor) to your account
  - Create a branch that will be the source for the deployment (e.g., "staging" or "test")
  - Modify the staging-to-pages.yml action to reference your deployment branch
  - Merge the desired test branch into the deplotment branch
    - The action will build and deploy the mdEditor to your GitHub Pages site (https://user.github.io/mdEditor)


