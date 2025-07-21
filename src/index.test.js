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
});
