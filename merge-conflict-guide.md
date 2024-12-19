# Merge Conflicts

What happens if you try to push your local changes without first pulling the remote changes from git:

![what happens if you push before pulling](https://courses.cs.washington.edu/courses/cse154/24au/homework/fp/push-before-pull.png)

How do you fix this?

1. Make a copy of your local file(s) and save it somewhere.
2. Run `git pull`.
    * You will most likely see something like this:
      ```
      <<<<<<< HEAD
      \\ your local changes
      =======
      \\ remote changes
      >>>>>>>
      ```
3. Find a way to combine the two different versions into one file.
    * Example: You and your partner both added an event listener and function to your JS file.
    * Solution: Move the remote `addEventListener` and remote function above the `=======`.
4. Manually edit the conflict:
    * Example Conflict
      ![example merge conflict in vscode](https://courses.cs.washington.edu/courses/cse154/24au/homework/fp/merge-conflict.png)
    * Move the remote changes into the HEAD
      ```
      <<<<<<< HEAD
      \\ your local changes
      \\ remote changes
      =======
      >>>>>>>
      ```
      ![moving remote changes into HEAD](https://courses.cs.washington.edu/courses/cse154/24au/homework/fp/move-remote-changes.png)
    * Get rid of the extraneous code (the `<<<<<<< HEAD`, `=======`, and `>>>>>>>`)
      ```
      \\ your local changes
      \\ remote changes
      ```
      ![cleaning up extraneous code](https://courses.cs.washington.edu/courses/cse154/24au/homework/fp/cleanup.png)
5. Do `git add`, `git commit`, and `git push` and (hopefully) your merge conflict is resolved.
6. If everything is successful, delete the copy of your local file(s) from step (1).

If this doesn't work and you can't figure out how to resolve a merge conflict, please feel free to reach out to the staff on Ed, via email, or in WPL/office hours.