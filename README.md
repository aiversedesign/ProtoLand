### ProtoLand

A minimal static playground for small projects. Each project lives in its own folder at `/{slug}` and the home page lists them from `projects.js`.

### How it works
- **Home**: `index.html` renders cards from `projects.js`.
- **Template**: Duplicate `_template/` to start a new project.
- **Project data**: Edit `{slug}/data.js` to set `window.PROJECT_DATA` (add any fields you need). The template page reads and renders these values.

### Quick start
1) Duplicate the template and rename to your slug:
```bash
cp -R _template piano
```
2) Edit `piano/data.js` (make sure `slug` matches the folder name).
3) Register it in `projects.js`:
```js
window.PROJECTS = [
  { slug: 'piano', title: 'Piano', description: 'Play with your keyboard', tags: ['App'] },
];
```
<!-- 4) Open locally:
```bash
python3 -m http.server 5173 -->
<!-- # visit http://localhost:5173/ -->
```

### Example prompt
```
create a new project called piano.

create an app that showcases a piano which i can play with the keys of my keyboard.
```


