"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type BookingDraft = { series?: string; zone?: string; symptom?: string };
type Ctx = {
  draft: BookingDraft;
  open: boolean;
  setDraft: (d: BookingDraft) => void;
  openBooking: (d?: BookingDraft) => void;
  closeBooking: () => void;
};

const BookingCtx = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftState] = useState<BookingDraft>({});
  const [open, setOpen] = useState(false);
  const setDraft = useCallback((d: BookingDraft) => setDraftState((p) => ({ ...p, ...d })), []);
  const openBooking = useCallback((d?: BookingDraft) => {
    if (d) setDraftState((p) => ({ ...p, ...d }));
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);
  const v = useMemo(() => ({ draft, open, setDraft, openBooking, closeBooking }), [draft, open, setDraft, openBooking, closeBooking]);
  return <BookingCtx.Provider value={v}>{children}</BookingCtx.Provider>;
}

export function useBooking() {
  const c = useContext(BookingCtx);
  if (!c) throw new Error("useBooking outside provider");
  return c;
}
