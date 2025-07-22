
import { useState } from "react";

export const usePath = (onMove) => {
    const [currentPath, setCurrentPath] = useState([]);

    const currentPathString = currentPath.join("/");

    function goBack(index) {
        if(typeof index === "number" && index >= 0) {
            var tmp = [...currentPath];
            while(tmp.length - 1 > index && tmp.length > 0) {
                tmp.pop();
            }
            setCurrentPath(tmp);
            if (typeof onMove == "function") {
                onMove(tmp);
            }
        } else if (currentPath.length > 0) {
            const tmp = [...currentPath];
            tmp.pop();
            setCurrentPath(tmp);
            if (typeof onMove == "function") {
                onMove(tmp);
            }
        }
    }

    function customSetCurrentPath(value) {
        let processedValue;

        if ([false, true, null, undefined].includes(value)) {
            processedValue = [];
        } else if (typeof value === "string") {
            processedValue = value === "" ? [] : value.split("/");
        } else if (
            typeof value === "number" || typeof value === "bigint"
            || (
                typeof value === "object" && !Array.isArray(value)
            ) 
        ) {
            processedValue = [value];
        } else {
            processedValue = value;
        }
        
        setCurrentPath(processedValue);
        if (typeof onMove == "function") {
            onMove(processedValue);
        }
    }

    function goHome() {
        setCurrentPath([]);
        if (typeof onMove == "function") {
            onMove([]);
        }
    }

    function goTo(path) {
        if(typeof path === "string" && path.length) {
            let newCurrentPath;
            
            // Si le chemin commence par "/", c'est un chemin absolu
            if (path.startsWith("/")) {
                newCurrentPath = [];
                // On enlève le "/" initial pour le traitement
                path = path.substring(1);
            } else {
                // Chemin relatif, on part du chemin actuel
                newCurrentPath = [...currentPath];
            }
    
            if (arguments.length > 1) {
                for(var i = 0; i < arguments.length; i++) {
                    const argument = arguments[i];
                    newCurrentPath.push(argument);
                }
            } else if(typeof path == "string") {
                // Seulement si il reste quelque chose après avoir enlevé le "/" initial
                if (path.length > 0) {
                    path.split("/").forEach(
                        (ressource) => {
                            if (ressource === "..") {
                                newCurrentPath.pop();
                            } else if (ressource !== "." && ressource !== "") {
                                newCurrentPath.push(ressource);
                            }
                        }
                    );
                }
            }
            
            setCurrentPath(newCurrentPath);
            if (typeof onMove == "function") {
                onMove(newCurrentPath);
            }
        }
    }

    return {
        currentPath,
        currentPathString,
        setCurrentPath: customSetCurrentPath,
        goTo,
        goBack,
        goHome,
    };
}