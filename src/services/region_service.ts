import { AppDataSource } from "../db/database";
import { Region } from "../entity/Region";
import { Repository } from "typeorm";
import { RegionInterface } from "../interfaces/interfaces";

export class RegionService {
  private regionRepository: Repository<Region>;

  constructor() {
    this.regionRepository = AppDataSource.getRepository(Region);
  }

  async createRegion(regionData: RegionInterface): Promise<Region> {
    const region = this.regionRepository.create(regionData);
    return await this.regionRepository.save(region);
  }

  async getRegion(): Promise<Region[]> {
    const regions = await this.regionRepository.find()
    return regions
  }

  async deleteRegion(id: number): Promise<boolean>{
    const result = await this.regionRepository.delete(id)
    return result.affected !== 0;
  }

  async updateRegion(id: number , regionData: Partial<RegionInterface>): Promise<Region | null>{
    const region = await this.regionRepository.findOneBy({id})
    if(region){
      const updatedRegion = await this.regionRepository.merge(region,regionData)
      return await this.regionRepository.save(updatedRegion)
    }
    return null
  }
}
