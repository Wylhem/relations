import { BaseDto } from "../../shared/base/base.dto";
import { PostEntity } from "../../post/entity/post.entity";
import { PersonDto } from "../../person/dto/person.dto";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryDto extends BaseDto{

  /**
   * Gets or sets label
   */
  label: string;


  public static Load(category: CategoryEntity): CategoryDto {
    return {
      id: category.ctg_id,
      label: category.ctg_label,
      updatedAt: category.ctg_updatedAt,
      createdAt: category.ctg_createdAt,
    };
  }
}
