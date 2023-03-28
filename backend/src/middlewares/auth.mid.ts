import { verify } from "jsonwebtoken";


export default (req: any, res: any, next: any) => {
    
    const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw ('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]
    
    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!);
        req.user = decodedUser;
         console.log(token ); 
         console.log(req.user );
    } catch (error) {
        res.status(401).send();
    }
    
    // const token = req.headers.access_token as string;
    // console.log(token);
    // if(!token) return res.status(401).send('no authorizedddddddddd');
    // try {
    //     const decodedUser = verify(token, process.env.JWT_SECRET!);
    //     req.user = decodedUser;
    // } catch (error) {
    //     res.status(401).send();
    // }

    return next();
}