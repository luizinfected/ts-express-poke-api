import { Request, Response } from "express";
import { GroupService } from "../services/group_service";
import { GroupInterface, IdParams} from "../interfaces/interfaces";

export class GroupController {
    private groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    createGroup = async (req: Request<{}, {}, GroupInterface>, res: Response) => {
        try {
            const group = await this.groupService.createGroup(req.body);
            res.status(201).send({ result: group });
        } catch (error) {
            res.status(500).send({ error: "Erro ao criar grupo" });
        }
    };

    getGroup = async (req: Request<{}, {}, GroupInterface>, res: Response) =>{
        try{
            const group = await this.groupService.getGroup();
            res.status(201).send({result : group})
        } catch (error){
            res.status(500).send({error: "Erro ao mostrar grupos"})
        }
    }

    updateGroup = async (req: Request<{id : string}, {}, GroupInterface>, res: Response) =>{
        const id = parseInt(req.params.id);
        try {
            const groupUpdate = await this.groupService.updateGroup(id,req.body)
            res.status(201).send({ result: groupUpdate });
        } catch (error) {
            res.status(500).send({ error: "Erro ao atualizar grupo" });
        }
    }

    deleteGroup = async (req: Request<{id: string}, {}, GroupInterface>, res: Response) => {
        const id = parseInt(req.params.id)
        try {
            const groupDelete = this.groupService.deleteGroup(id);
            res.status(201).send({ result: groupDelete })
        } catch (error) {
            res.status(500).send({ error: "Erro ao mostrar grupos" })
        }
    }
}
