
import { useState } from "react";

export const usePath = (onMove) => {
    const [currentPath, setCurrentPath] = useState([]);

    function goBack() {
        if(currentPath.length > 0) {
            const tmp = [...currentPath];
            tmp.pop();
            setCurrentPath(tmp);
        }
    }

    function customSetCurrentPath(value) {
        setCurrentPath(value);
        if (onMove != undefined) {
            onMove(value);
        }
    }

    function goHome() {
        setCurrentPath([]);
    }

    function goTo(path) {
        if(typeof path === "string" && path.length) {
            let newCurrentPath = [...currentPath];
    
            if (arguments.length > 1) {
                for(var i = 0; i < arguments.length; i++) {
                    const argument = arguments[i];
                    newCurrentPath.push(argument);
                }
            } else if(typeof path == "string") {
                path.split("/").forEach(
                    (ressource) => {
                        if (ressource === "..") {
                            newCurrentPath.pop();
                        } else if (ressource !== ".") {
                            newCurrentPath.push(ressource);
                        }
                    }
                );
            }
            
            setCurrentPath(newCurrentPath);
        }
    }

    return {
        currentPath,
        setCurrentPath: customSetCurrentPath,
        goTo,
        goBack,
        goHome
    };
}