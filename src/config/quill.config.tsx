
export const quillModuleConfig = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, 4, false] },],
      [
        { 'size': ['small', false, 'large', 'huge'] }, {
          'color': [
            '#000', '#e70000', '#ff9a00', '#ff0', '#00bb00', '#1890ff', '#0066cd', '#facdcd', '#f06666',
            '#bcbcbc', '#fff',
          ]
        }
      ],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
    // handlers: {
    //   image: imageHandler,
    // },
  },
};

export const quillFormatConfig: string[] = [
  'header', 'size', 'color',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'header', 'header',
  'list', 'bullet', 'indent',
  'link', 'image',
];
