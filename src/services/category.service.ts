import { CategoryModel } from "../data/mongoDb/models/category.model";
import { CartegoryEntity } from "../domain/entities/category.entity";
import { categoryMaper } from "../domain/mapers/category.mapers";
import { CreateCategoryDto } from "../domain/dtos/category/create-category.dto";
import { UpdateCategoryDto } from "../domain/dtos/category/update-category.dto";

export class CategoryService{
    async create (createCategoryDto:CreateCategoryDto):Promise<CartegoryEntity>{
        const {name} = createCategoryDto;
        try {

            const exist = await CategoryModel.findOne({name});
            if(exist) throw Error('Error');
            const category = await CategoryModel.create(createCategoryDto);
            if(!category) throw Error('Error')
            await category.save();
            return categoryMaper.fromEntity(category);
            
        } catch (error) {
           throw error; 
        }
    }

    async update(updateCategoryDto:UpdateCategoryDto, id:string):Promise<CartegoryEntity>{
        try {
            const category = await CategoryModel.findByIdAndUpdate({
                id: updateCategoryDto,
                data:{...updateCategoryDto}
            });
            if(!category) throw Error('Error')
            await category.save();
            return categoryMaper.fromEntity(category);

        } catch (error) {
            throw error; 
        }
    }

    async delete(id:string):Promise<CartegoryEntity>{
        try {
            const category = await CategoryModel.findOneAndDelete({id});
            if(!category) throw Error('Error')
            return categoryMaper.fromEntity(category);

        } catch (error) {
            throw error; 
        }
    }

    async findOne(id:string):Promise<CartegoryEntity>{
        try {
            const category = await CategoryModel.findOne({id});
            if(!category) throw Error('Error')
            return categoryMaper.fromEntity(category);
      
        } catch (error) {
            throw error; 
        }
    }

}