import Quill from 'quill';

// blockEmbed -> Quill.import('blots/block/embed');
const InlineEmbed = Quill.import('blots/embed');


export interface IQuillImageBlotProps {
  alt: string;
  src: string;
  'data-src': string;
  class?: string,
};

/**
 * 自定义覆盖 insertEmbed
 */
export default class QuillImageBlot extends InlineEmbed {

  public static blotName: string = 'image';
  public static tagName: string = 'img';
  public static className: string = 'inline-img';


  public static create(value: IQuillImageBlotProps) {
    const node = super.create();
    
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.src);
    node.setAttribute('data-src', value["data-src"]);
    node.setAttribute('class', value.class ? value.class : QuillImageBlot.className);

    return node;
  }

  public static value(node: any) {
    return {
      alt: node.getAttribute('alt'),
      src: node.getAttribute('src'),
      'data-src': node.getAttribute('data-src'),
      class: node.getAttribute('class'),
    };
  }
}