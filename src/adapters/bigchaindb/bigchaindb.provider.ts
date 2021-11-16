import * as BigchainDB from 'bigchaindb-driver';
import * as bip39 from 'bip39';

export class BigchaindbProvider {
  private readonly cluster = [
    'http://localhost:10001/api/v1/',
    'http://localhost:30001/api/v1/',
    'http://localhost:20001/api/v1/',
  ];

  get connection() {
    return new BigchainDB.Connection(this.cluster);
  }

  deriveUser(seedPhrase: string): BigchainDB.Ed25519Keypair {
    return new BigchainDB.Ed25519Keypair(
      bip39.mnemonicToSeedSync(seedPhrase).slice(0, 32),
    );
  }
}
