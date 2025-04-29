import { create } from 'zustand';

interface PdfData {
  name: string;
  subject: string;
  outline: string[];
  content: string;
}

interface PdfStore {
  pdfData: PdfData;
  setPdfData: (data: Partial<PdfData>) => void;
  resetPdfData: () => void;
}

const initialPdfData: PdfData = {
  name: '',
  subject: '',
  outline: [],
  content: '',
};

export const usePdfStore = create<PdfStore>((set) => ({
  pdfData: initialPdfData,
  setPdfData: (data) => 
    set((state) => ({ 
      pdfData: { ...state.pdfData, ...data } 
    })),
  resetPdfData: () => set({ pdfData: initialPdfData }),
})); 