"use client"

import { AlertMessage } from "@/components/ui/alert";
import { Ban, Check } from "lucide-react";

export const ToggleActiveButton = ({ row, onStatusChange }: any) => {
 
    const handleToggleActive = async () => {
        //const response = await changeStatusAgreement({ agreementId: row.id.toString(), status: !row.active, key: keyString });
        //if (typeof response === 'object' && 'statusCode' in response && response.statusCode > 200 && 'message' in response) {
        //    throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
//}
    };

    return (
        <AlertMessage
            iconLucide={row.active ?
                <div className="rounded-full overflow-hidden bg-red-200">
                    <Ban className="text-red-600 p-2 size-12" />
                </div>
                :
                <div className="rounded-full overflow-hidden bg-green-200">
                    <Check className="text-green-600 p-2 size-12" />
                </div>
            }
            isActive={row.active}
            onToggle={handleToggleActive}
            activeText="Active"
            inactiveText="Inactive"
            dialogTitle={row.active ? "Desactive" : "Active"}
            dialogDescription={row.active ? "Are you sure?" : "Are you sure?"}
            cancelText="Cancel"
            confirmText={row.active ? "Yes" : "No"}
            successMessage="Propiertie updated"
            errorMessage="Failed to update propiertie"
            activeColor={""}
            inactiveColor={""}
            onStatusChange={onStatusChange}
        />
    );
};