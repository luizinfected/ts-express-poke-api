import { Request, Response } from "express";
import { RegionService } from "../services/region_service";
import { RegionInterface } from "../interfaces/interfaces";

export class RegionController {
    private regionService: RegionService;

    constructor() {
        this.regionService = new RegionService();
    }

    createRegion = async (req: Request<{}, {}, RegionInterface>, res: Response) => {
        try {
            const region = await this.regionService.createRegion(req.body);
            res.status(201).send({ result: region });
        } catch (error) {
            res.status(500).send({ error: "Erro ao criar a região" });
        }
    };

    getAllRegions = async(req: Request, res: Response) => {
        try {
            const regions = await this.regionService.getRegion()
            res.status(201).send({ result: regions });
        } catch (error) {
            res.status(500).send({ error: "Erro ao obter regiões" });
        }
    }

    updateRegion = async (id:number, req: Request<{id: string}, {}, RegionInterface>, res: Response) =>{
        try {
            const updateRegion = await this.regionService.updateRegion(id, req.body)
            res.status(201).send({ result: updateRegion });
        } catch (error) {
            res.status(500).send({ error: "Erro ao atualizar regiões" });
        }
    }

    deleteRegion = async(id:number, req: Request, res: Response) =>{
        try {
            const deleteRegion = await this.regionService.deleteRegion(id)
            res.status(201).send(deleteRegion)
        } catch (error) {
            res.status(500).send({ error: "Erro ao deletar região"})
        }
    }

}
