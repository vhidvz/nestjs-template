import { getPlainGrant } from 'common/utils/grant.util';
import { Inject, Injectable } from '@nestjs/common';
import { Grant } from 'grant/entities/grant.entity';
import { GrantService } from 'grant/grant.service';
import AccessControl from 'abacl';

@Injectable()
export class AuthorityService extends AccessControl {
  constructor(
    @Inject('ACCESS_ABILITIES') grant: Grant[],
    private readonly grantService: GrantService,
  ) {
    super(getPlainGrant(grant));

    this.grantService
      .findAll()
      .then((grants) => {
        this.acl = getPlainGrant(grants);
      })
      .catch((err) => {
        throw err;
      });
  }
}
