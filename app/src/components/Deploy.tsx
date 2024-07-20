import { Verifier__factory, ZkApp__factory } from 'contracts';
import { useEthers } from '@usedapp/core';
import { BytesLike, solidityKeccak256 } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';

export const key = (bytecode: BytesLike, chainId?: number) => `${solidityKeccak256(['bytes'], [bytecode])}:${chainId}`;

function Deploy({ onResult }: { onResult: (deployed: string) => void }) {
  const { library } = useEthers();

  const [verifier, setVerifier] = useState<string>('0xa513E6E4b8f2a923D98304ec87F64353C4D5C853');
  const [zkApp, setZkApp] = useState<string>('0x8A791620dd6260079BF849Dc5567aDC3F2FdC318');

  useEffect(() => {
    if (zkApp) onResult(zkApp);
  }, [zkApp]);
  console.log('verifier', verifier);
  return (
    <div>
      {verifier ? (
        `Verifier: ${verifier}`
      ) : (
        <button
          disabled={!library}
          onClick={async () => {
            if (!library) throw Error('not connected');
            const signer = library.getSigner();
            new Verifier__factory(signer).deploy().then((verifier) => setVerifier(verifier.address));
          }}
        >
          Deploy verifier
        </button>
      )}
      <br />
      {zkApp ? (
        `Deployed: ${zkApp}`
      ) : (
        <button
          disabled={!library || !verifier}
          onClick={async () => {
            if (!library || !verifier) throw Error('not connected');
            const signer = library.getSigner();
            new ZkApp__factory(signer).deploy(verifier).then((zkApp) => zkApp.deployed().then(() => setZkApp(zkApp.address)));
          }}
        >
          Deploy zk app contract
        </button>
      )}
    </div>
  );
}

export default Deploy;
