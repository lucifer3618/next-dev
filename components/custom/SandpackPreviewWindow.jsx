import { ActionContext } from '@/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
import React, { useContext, useEffect, useRef, useState } from 'react'

function SandpackPreviewWindow() {
    const previewRef = useRef();
    const { sandpack } = useSandpack();
    const { action, setAction } = useContext(ActionContext);
    const [sandpackData, setSandpackData] = useState();

    useEffect(() => {
        if (sandpack && action) {
            GetSandpackClient();
        }
    }, [action]);


    const GetSandpackClient = async () => {
        const client = previewRef.current.getClient();
        if (client) {
            const result = await client.getCodeSandboxURL();
            console.log(result.sandboxId);
            if (action.actionType == "deploy") {
                window.open(
                    `https://${result.sandboxId}.csb.app`,
                    "_blank", // Opens in a new tab or window
                    "noopener,noreferrer" // Improves security by preventing reference leakage
                );
            } else if (action.actionType == "export") {
                window.open(result.editorUrl);
            }
        }
    }

    return (
        <SandpackPreview
            ref={previewRef}
            showNavigator={true}
            style={{ height: '79vh' }}
        />
    )
}

export default SandpackPreviewWindow