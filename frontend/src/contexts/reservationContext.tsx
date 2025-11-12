import { useContext, createContext, useState } from "react";
import type { ReservationContextType } from "../components/ReservationPage";

export const ReservationContext = createContext<ReservationContextType | undefined>(undefined);
export const useReservationContext = () => {
    return useContext(ReservationContext);
}

export const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservation_date, setReservationDate] = useState<string>("");
    const saveReservationDate = (date: string) => setReservationDate(date);
    return (
        <ReservationContext.Provider value={{reservation_date, saveReservationDate}}>
            {children}
        </ReservationContext.Provider>
    );
}