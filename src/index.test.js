import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from "@testing-library/react";
import { usePath } from './index.js';

describe('usePath', () => {
  it('should initialize with empty path', () => {
    const { result } = renderHook(() => usePath());
    expect(result.current.currentPath).toEqual([]);
  });

  it('should navigate to a path', () => {
    const { result } = renderHook(() => usePath());
    
    act(() => {
      result.current.goTo('folder1/folder2');
    });

    expect(result.current.currentPath).toEqual(['folder1', 'folder2']);
  });

  it('should go back one level', () => {
    const { result } = renderHook(() => usePath());
    
    act(() => {
      result.current.goTo('folder1/folder2/folder3');
    });

    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentPath).toEqual(['folder1', 'folder2']);
  });

  it('should go home', () => {
    const { result } = renderHook(() => usePath());
    
    act(() => {
      result.current.goTo('folder1/folder2');
    });

    act(() => {
      result.current.goHome();
    });

    expect(result.current.currentPath).toEqual([]);
  });

  it('should call onMove callback when path changes', () => {
    const onMove = vi.fn();
    const { result } = renderHook(() => usePath(onMove));
    
    act(() => {
      result.current.goTo('folder1');
    });

    expect(onMove).toHaveBeenCalledTimes(1);
  });

  it('should handle relative paths with .. and .', () => {
    const { result } = renderHook(() => usePath());
    
    act(() => {
      result.current.goTo('folder1/folder2');
    });

    act(() => {
      result.current.goTo('../folder3/./folder4');
    });

    expect(result.current.currentPath).toEqual(['folder1', 'folder3', 'folder4']);
  });

  it('should handle absolute paths starting with /', () => {
    const { result } = renderHook(() => usePath());
    
    // D'abord on navigue quelque part
    act(() => {
      result.current.goTo('folder1/folder2');
    });

    // Puis on utilise un chemin absolu
    act(() => {
      result.current.goTo('/folder3/folder4');
    });

    expect(result.current.currentPath).toEqual(['folder3', 'folder4']);
  });

  it('should handle absolute path with just /', () => {
    const { result } = renderHook(() => usePath());
    
    // D'abord on navigue quelque part
    act(() => {
      result.current.goTo('folder1/folder2');
    });

    // Puis on utilise un chemin absolu vers la racine
    act(() => {
      result.current.goTo('/');
    });

    expect(result.current.currentPath).toEqual([]);
  });

  it('should handle absolute paths with relative elements', () => {
    const { result } = renderHook(() => usePath());
    
    // D'abord on navigue quelque part
    act(() => {
      result.current.goTo('folder1/folder2');
    });

    // Puis on utilise un chemin absolu avec des éléments relatifs
    act(() => {
      result.current.goTo('/folder3/../folder4/./folder5');
    });

    expect(result.current.currentPath).toEqual(['folder4', 'folder5']);
  });

  // Tests pour la fonctionnalité onMove
  describe('onMove callback', () => {
    it('should call onMove with correct path on goTo', () => {
      const onMove = vi.fn();
      const { result } = renderHook(() => usePath(onMove));
      
      act(() => {
        result.current.goTo('folder1/folder2');
      });

      expect(onMove).toHaveBeenCalledWith(['folder1', 'folder2']);
    });

    it('should call onMove on goBack', () => {
      const onMove = vi.fn();
      const { result } = renderHook(() => usePath(onMove));
      
      act(() => {
        result.current.goTo('folder1/folder2/folder3');
      });

      vi.clearAllMocks();

      act(() => {
        result.current.goBack();
      });

      expect(onMove).toHaveBeenCalledWith(['folder1', 'folder2']);
    });

    it('should call onMove on goHome', () => {
      const onMove = vi.fn();
      const { result } = renderHook(() => usePath(onMove));
      
      act(() => {
        result.current.goTo('folder1');
      });

      vi.clearAllMocks();

      act(() => {
        result.current.goHome();
      });

      expect(onMove).toHaveBeenCalledWith([]);
    });

    it('should call onMove on setCurrentPath', () => {
      const onMove = vi.fn();
      const { result } = renderHook(() => usePath(onMove));
      
      act(() => {
        result.current.setCurrentPath(['custom', 'path']);
      });

      expect(onMove).toHaveBeenCalledWith(['custom', 'path']);
    });
  });

  // Tests pour setCurrentPath avec différents types
  describe('setCurrentPath with different value types', () => {
    it('should handle string values by splitting with /', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.setCurrentPath('folder1/folder2/folder3');
      });

      expect(result.current.currentPath).toEqual(['folder1', 'folder2', 'folder3']);
    });

    it('should handle empty string by returning empty array', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.setCurrentPath('');
      });

      expect(result.current.currentPath).toEqual([]);
    });

    it('should handle null by returning empty array', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.setCurrentPath(null);
      });

      expect(result.current.currentPath).toEqual([]);
    });

    it('should handle undefined by returning empty array', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.setCurrentPath(undefined);
      });

      expect(result.current.currentPath).toEqual([]);
    });

    it('should handle boolean false by returning empty array', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.setCurrentPath(false);
      });

      expect(result.current.currentPath).toEqual([]);
    });

    it('should handle boolean true by returning empty array', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.setCurrentPath(true);
      });

      expect(result.current.currentPath).toEqual([]);
    });

    it('should handle number by creating array with number at position 0', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.setCurrentPath(42);
      });

      expect(result.current.currentPath).toEqual([42]);
    });

    it('should handle bigint by creating array with bigint at position 0', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.setCurrentPath(BigInt(123));
      });

      expect(result.current.currentPath).toEqual([BigInt(123)]);
    });

    it('should handle object by creating array with object at position 0', () => {
      const { result } = renderHook(() => usePath());
      const testObject = { name: 'test' };
      
      act(() => {
        result.current.setCurrentPath(testObject);
      });

      expect(result.current.currentPath).toEqual([testObject]);
    });

    it('should handle arrays as-is', () => {
      const { result } = renderHook(() => usePath());
      const testArray = ['folder1', 'folder2'];
      
      act(() => {
        result.current.setCurrentPath(testArray);
      });

      expect(result.current.currentPath).toEqual(testArray);
    });
  });

  // Tests pour goTo avec plusieurs arguments (tableau)
  describe('goTo with multiple arguments', () => {
    it('should handle multiple string arguments', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.goTo('folder1', 'folder2', 'folder3');
      });

      expect(result.current.currentPath).toEqual(['folder1', 'folder2', 'folder3']);
    });

    it('should handle mixed argument types', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.goTo('folder1', 42, 'folder3');
      });

      expect(result.current.currentPath).toEqual(['folder1', 42, 'folder3']);
    });

    it('should handle multiple arguments with absolute path', () => {
      const { result } = renderHook(() => usePath());
      
      // D'abord naviguer quelque part
      act(() => {
        result.current.goTo('existing/path');
      });

      // Puis utiliser un chemin absolu avec plusieurs arguments
      act(() => {
        result.current.goTo('/', 'new', 'absolute', 'path');
      });

      expect(result.current.currentPath).toEqual(['/', 'new', 'absolute', 'path']);
    });

    it('should handle multiple arguments with relative path', () => {
      const { result } = renderHook(() => usePath());
      
      // D'abord naviguer quelque part
      act(() => {
        result.current.goTo('base/path');
      });

      // Puis ajouter avec plusieurs arguments relatifs
      act(() => {
        result.current.goTo('sub1', 'sub2', 'sub3');
      });

      expect(result.current.currentPath).toEqual(['base', 'path', 'sub1', 'sub2', 'sub3']);
    });
  });

  // Tests pour goBack avec index
  describe('goBack with index', () => {
    it('should go back to specific index', () => {
      const { result } = renderHook(() => usePath());
      
      // Naviguer vers un chemin profond
      act(() => {
        result.current.goTo('folder1/folder2/folder3/folder4/folder5');
      });

      // Retourner à l'index 2 (folder3 sera le dernier élément)
      act(() => {
        result.current.goBack(2);
      });

      expect(result.current.currentPath).toEqual(['folder1', 'folder2', 'folder3']);
    });

    it('should go back to index 0 (first element)', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.goTo('folder1/folder2/folder3/folder4');
      });

      act(() => {
        result.current.goBack(0);
      });

      expect(result.current.currentPath).toEqual(['folder1']);
    });

    it('should handle going back to root with negative or invalid index', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.goTo('folder1/folder2/folder3');
      });

      // Test avec un index négatif (devrait être ignoré et faire un goBack normal)
      act(() => {
        result.current.goBack(-1);
      });

      expect(result.current.currentPath).toEqual(['folder1', 'folder2']);
    });

    it('should handle index larger than path length', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.goTo('folder1/folder2');
      });

      // Index plus grand que la longueur du chemin (ne devrait rien changer)
      act(() => {
        result.current.goBack(5);
      });

      expect(result.current.currentPath).toEqual(['folder1', 'folder2']);
    });

    it('should call onMove when going back to specific index', () => {
      const onMove = vi.fn();
      const { result } = renderHook(() => usePath(onMove));
      
      act(() => {
        result.current.goTo('folder1/folder2/folder3/folder4');
      });

      vi.clearAllMocks();

      act(() => {
        result.current.goBack(1);
      });

      expect(onMove).toHaveBeenCalledWith(['folder1', 'folder2']);
    });

    it('should not change path when index equals current last index', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.goTo('folder1/folder2/folder3');
      });

      // L'index actuel du dernier élément est 2, donc goBack(2) ne devrait rien changer
      act(() => {
        result.current.goBack(2);
      });

      expect(result.current.currentPath).toEqual(['folder1', 'folder2', 'folder3']);
    });

    it('should handle index 0 when path has only one element', () => {
      const { result } = renderHook(() => usePath());
      
      act(() => {
        result.current.goTo('folder1');
      });

      act(() => {
        result.current.goBack(0);
      });

      expect(result.current.currentPath).toEqual(['folder1']);
    });

    it('should handle goBack with index on empty path', () => {
      const { result } = renderHook(() => usePath());
      
      // Le chemin est déjà vide, goBack avec index ne devrait rien faire
      act(() => {
        result.current.goBack(0);
      });

      expect(result.current.currentPath).toEqual([]);
    });
  });
});
