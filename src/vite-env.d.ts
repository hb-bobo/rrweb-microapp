/// <reference types="vite/client" />

// import { Question } from "./interface";

interface Document {
    __FB_SETTINGS?: {
        v: string
        pid: number,
        trigger?: string
    }
}
interface Window {
    __FEEDBACK_RENDER?: (data: {
        element?: HTMLElement;
        projectId?: number;
        iconStyle?: React.CSSProperties;
        questions?: any[];
    }) => void
    MReporter?: new (data: {spmBiz: string}) => {click: () => void, show: () => void}
}