import { NotAuthenticatedError,NotAuthorizedError } from "../errors";
import { CustomError } from "../errors/custom-error";
import { isTokenValid } from '../utils'
import Token from '../models/Token';
import { attachCookiesToResponse }  from '../utils';


const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new NotAuthenticatedError();
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new NotAuthenticatedError();
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new NotAuthorizedError()
    }
    next();
  };
};

export  {
  authenticateUser,
  authorizePermissions,
};
