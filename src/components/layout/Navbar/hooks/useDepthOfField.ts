import { useState, useCallback } from "react";

export function useDepthOfField() {
    const [focusedLink, setFocusedLink] = useState<string | null>(null);

    const registerLink = useCallback((href: string) => ({
        onMouseEnter: () => setFocusedLink(href),
        onMouseLeave: () => setFocusedLink(null),
    }), []);

    return { focusedLink, registerLink };
}
