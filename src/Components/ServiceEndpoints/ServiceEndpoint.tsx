import type { DidUri } from '@kiltprotocol/sdk-js';

import { useCallback, useState } from 'react';
import classnames from 'classnames';

import * as styles from './ServiceEndpoint.module.css';

import { CredentialVerifier } from '../Credential/Credential';
import { useBooleanState } from '../../Utils/useBooleanState';

interface Props {
  url: string;
  endpointType: string;
  did: DidUri;
}

export function ServiceEndpoint({ url, endpointType, did }: Props) {
  const [credential, setCredential] = useState();

  const fetching = useBooleanState();
  const fetched = useBooleanState();

  const handleFetch = useCallback(async () => {
    if (fetched.current) {
      fetched.off();
      setCredential(undefined);
      return;
    } else {
      fetched.on();
    }
    if (credential) {
      return;
    }
    fetching.on();

    try {
      const response = await fetch(url);
      const result = await response.json();
      setCredential(result);

      if (!did) {
        throw new Error('No DID');
      }
    } catch (error) {
      console.log(error);
      fetched.off();
    } finally {
      fetching.off();
    }
  }, [credential, did, fetched, fetching, url]);

  return (
    <div className={styles.container}>
      <div className={styles.endpointTypeContainer}>
        <span className={styles.endpoint}>{endpointType}</span>

        <button
          className={classnames(
            fetched.current ? styles.closeBtn : styles.fetchBtn,
            fetching.current && styles.loader,
          )}
          onClick={() => handleFetch()}
        >
          <span>{fetched ? 'Close' : 'Fetch'}</span>
        </button>
      </div>

      <span className={styles.endpoint}>{url}</span>

      {credential && <CredentialVerifier credential={credential} did={did} />}
    </div>
  );
}
