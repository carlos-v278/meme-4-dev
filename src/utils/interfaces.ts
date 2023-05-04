 export interface Meme {
  _id:string,
  topText:string,
  bottomText:string,
  imageUrl:string,
}


export interface Links {
  name:string | undefined;
  pathName:string | undefined;
  to:string | undefined;
}
