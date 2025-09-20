import api from "@/lib/api";

export const TaxService = {
    async computeTax(id: number){
        const res = await api.get(`/users/${id}/tax`);
        return res.data;
    }
}