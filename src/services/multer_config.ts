import multer, { DiskStorageOptions } from "multer";
import { Request } from "express";

// Configuração do multer para upload de imagens
const storage: DiskStorageOptions = {
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void => {
        cb(null, 'uploads/');  // Pasta onde as imagens serão salvas
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void => {
        cb(null, `${Date.now()}-${file.originalname}`);  // Nome único para a imagem
    }
};

export const upload = multer({ storage: multer.diskStorage(storage) });