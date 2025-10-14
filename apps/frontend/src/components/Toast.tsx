import React, { useEffect, useState } from "react";
import {
  ToastContainer,
  ToastItem,
  ToastContent,
  ToastTitle,
  ToastMessage,
  CloseButton,
} from "../styles/Toast.styles";

export type ToastType = "success" | "error" | "info";

type ToastData = {
  id: number;
  type: ToastType;
  message: string;
};

export const toast = (message: string, type: ToastType = "info") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("app:toast", { detail: { message, type } }));
  }
};

export const ToastProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ToastData[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ message: string; type: ToastType }>;
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const entry: ToastData = { id, type: custom.detail.type, message: custom.detail.message };
      setItems((prev) => [...prev, entry]);
      // auto dismiss after 3.5s
      window.setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, 3500);
    };

    window.addEventListener("app:toast", handler as EventListener);
    return () => window.removeEventListener("app:toast", handler as EventListener);
  }, []);

  const dismiss = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <>
      {children}
      <ToastContainer>
        {items.map((t) => (
          <ToastItem key={t.id} type={t.type}>
            <ToastContent>
              <ToastTitle>
                {t.type === "success" ? "Success" : t.type === "error" ? "Error" : "Notice"}
              </ToastTitle>
              <ToastMessage>{t.message}</ToastMessage>
            </ToastContent>
            <CloseButton aria-label="Close" onClick={() => dismiss(t.id)}>
              <span className="material-symbols-outlined">close</span>
            </CloseButton>
          </ToastItem>
        ))}
      </ToastContainer>
    </>
  );
};

export default ToastProvider;

