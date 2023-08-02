## Guidelines

### Create issue first

Please do not create a Pull Request unless it resolves one or more issues.
If there is no relevant issue then create one!
Any changes needs to be discussed before proceeding.
Failure to do so may result in the rejection of the pull request.
Remember, **pull requests should close one or more issues**.

### Closing issues

Identify the issues that this pull request addresses. List the issues below using syntax such as `closes #XXXX`, `fixes #YYYY`, etc.
See "[Linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)" for acceptable keywords.



### Test plan

Demonstrate the code is solid. Example: The exact commands you ran and their output, screenshots / videos if the pull request changes UI.


### Code formatting

All code should comply with current style guidelines. See [CONTRIBUTING.md](https://github.com/adiwg/mdEditor/blob/develop/CONTRIBUTING.md) for details.

## Pull Request

The pull request title and description should follow the same [guidelines used to create commit messages](https://github.com/adiwg/mdEditor/blob/develop/CONTRIBUTING.md#commit-messages).  Pull requests should address one or more closely related issues. _Avoid submitting a large pull request that resolves muliple unrelated issues_. 


### Please check if the PR fulfills these requirements:

  - [ ] The commit message follows our guidelines
  - [ ] The PR addresses one, or several closely related issues
  - [ ] The PR contains a single commit (squash locally before submission)
  - [ ] Tests for the changes have been added (for bug fixes / features)
  - [ ] Docs have been added / updated (for bug fixes / features)


### _Dennis. I'm thinking of deleting these since they should be covered by the related issues (which are required) that the PR resolves_.
> **What kind of change does this PR introduce?** (Bug fix, feature, docs update, ...) 
> 
> 
> 
> **What is the current behavior?** (You can also link to an open issue here)
> 
> 
> 
> **What is the new behavior (if this is a feature change)?**



### Does this PR introduce a breaking change?

If so, desribe items that users should be aware of, or tasks they should perform to accommodate the change in functionality.


### Does the PR require changes to other mdToolkit components?

Identify other mdToolkit components that require updates before the changes can be implemented. If dependancies exist with other repositories, use the "Other information" section below to describe the required release sequence (if applicable) or any other relevant issues.

  - [ ] Translator (adiwg/mdtranslator#xxxx)
  - [ ] Profiles (adiwg/msprofiles#xxxx)
  - [ ] Schema (adiwg/mdschemas#xxxx)
  - [ ] Documentation

### [_OPTIONAL_] Other information:

Please provide any other information that may be needed, such as any post deployment tasks that should be performed, recommendations for items to include in updated documentation, or links to related issues/dependancies that may need to be addressed prior to deployment.


_All contributions to this project will be released under the same terms as the default [repository license](https://github.com/adiwg/mdEditor/blob/master/LICENSE)_.
