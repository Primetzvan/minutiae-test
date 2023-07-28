import { SetMetadata } from '@nestjs/common';

// tODO: delete or generate public
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const jwtConstants = {
  expireTimeAccess: '1h', // 1 Stunde - für 60 sekunden könnte man z.B. '60s' nehmen
  expireTimeRefresh: '168h', // 1 woche
};

