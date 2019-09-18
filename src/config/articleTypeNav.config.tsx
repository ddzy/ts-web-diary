import {
  ARTICLE_TYPE_PICKER,
  ARTICLE_TYPE_WITH_ENGLISH_PICKER,
} from "constants/constants";


export interface IArticleTypeNavConfigParams {
  path: string;
  name: string;
  type: string;
};


/**
 * [首页] 文章分类, 二级导航配置
 */
export default function generateArticleTypeNavConfig() {
  const articleTypeNavConfig: IArticleTypeNavConfigParams[] = [];

  ARTICLE_TYPE_PICKER.forEach((v, i) => {
    articleTypeNavConfig.push({
      name: v,
      path: `/home/${ARTICLE_TYPE_WITH_ENGLISH_PICKER[i]}`,
      type: ARTICLE_TYPE_WITH_ENGLISH_PICKER[i],
    });
  });

  return articleTypeNavConfig;
}