# LeanNotebookSystem
The aim of this project is to create a notebook system much like `Jupyter Notebook` for writing formal proofs in `lean`.

# Core Features:
1. `lean` code can be split up over multiple cells
2. If a cell consists only of comments, it is treated as a text cell and rendered in `latex`
3. Cells can be enabled and disabled
4. begin and end cells are linked (if both are enabled or both are disabled)
5. Lean Server window shows progression of the tactic state as the user enables/disables different codeblocks

# Companion Features:
1. `MongoDB` database for storing saved notebooks.
2. Homepage for navigating stored notebooks (with user authentication)

# Technologies:
1. `lean` formal proof language
2. `emscription` build of `lean`
3. `React.js` for the frontend notebook ui
4. `MERN` stack for the companion web app

# References:
1. The lean compiler portion comes from this [Simple example](https://github.com/leanprover/lean.js/blob/master/examples/simple-lean-js-example.html) and the [lean.js](https://leanprover.github.io/lean.js/lean.js) emscription build of `lean`.
2. `lean` community: https://leanprover-community.github.io/
