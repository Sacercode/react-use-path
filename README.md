# react-use-path

> React Path Hook - Manage navigation paths as JavaScript arrays

[![NPM](https://img.shields.io/npm/v/react-use-path.svg)](https://www.npmjs.com/package/react-use-path) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A React hook for managing and navigating paths represented as JavaScript arrays. Ideal for creating navigation interfaces, breadcrumbs, or file explorers.

## Installation

```bash
npm install @sacercode/react-use-path
```

Ou depuis GitHub :

```bash
npm install git+https://github.com/Sacercode/react-use-path.git
```

## Usage

```jsx
import React from 'react'
import { usePath } from '@sacercode/react-use-path'

const MyComponent = () => {
    const { currentPath, currentPathString, goTo, goBack, goHome } = usePath(
        (newPath) => {
            console.log('Path changed:', newPath)
        }
    )

    return (
        <div>
            <div>Current path: /{currentPathString}</div>
            <div>Path, separated by commas : {currentPath.join(", ")}</div>
            
            {/* Navigation relative */}
            <button onClick={() => goTo('documents/photos')}>
                Go to documents/photos
            </button>
            
            {/* Navigation absolue */}
            <button onClick={() => goTo('/users/john/downloads')}>
                Go to /users/john/downloads
            </button>
            
            {/* Navigation avec éléments relatifs */}
            <button onClick={() => goTo('../videos')}>
                Go to sibling videos folder
            </button>
            
            <button onClick={goBack}>Go back</button>
            <button onClick={goHome}>Go home</button>
        </div>
    )
}
```

### API

Le hook `usePath` retourne un objet avec :

- **`currentPath`** : `string[]` - Le chemin actuel sous forme de tableau
- **`goTo(path: string)`** : Navigue vers un chemin
  - Chemin relatif : `"folder1/folder2"` (s'ajoute au chemin actuel)
  - Chemin absolu : `"/folder1/folder2"` (remplace le chemin actuel)
  - Supporte `..` (dossier parent) et `.` (dossier actuel)
- **`goBack(index?: number)`** : Revient en arrière d'un niveau ou à un index spécifique
- **`goHome()`** : Retourne à la racine (`[]`)
- **`setCurrentPath(path: string[])`** : Définit directement le chemin

### Exemples de chemins

| Type | Exemple | Résultat |
|------|---------|----------|
| Relatif | `"documents/photos"` | Ajoute au chemin actuel |
| Absolu | `"/documents/photos"` | Remplace le chemin actuel |
| Parent | `"../videos"` | Remonte d'un niveau puis va dans videos |
| Complexe | `"/users/../home/./docs"` | Va à `/home/docs` |
| Racine | `"/"` | Va à la racine `[]` |

Voir [/example/src/App.jsx](/example/src/App.jsx) pour un exemple complet.

## Développement

Installation des dépendances :
```bash
npm install
```

Build de la librairie :
```bash
npm run build
```

Tests :
```bash
npm test
```

Développement avec watch :
```bash
npm run dev
```

Tester l'exemple :
```bash
cd example
npm install
npm run dev
```


## License

SEE LICENCE IN LICENCE.md ©

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
