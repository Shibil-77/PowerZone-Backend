import jwt from 'jsonwebtoken'

export const generateToken = async (id: string ) => {
  const payload = { id }
  return jwt.sign(payload, <string>process.env.SECRET_TOKEN, {
    expiresIn: '1d'
  })
}
