import { Injectable } from '@nestjs/common';
import { exec, execFile, fork, spawnSync } from 'child_process';

@Injectable()
export class DockerService {
  async pythonTest() {
    try {
      let dataToSend;
      const python = spawnSync('python', ['test.py']);
      console.log('python on');
      console.log(python.stdout.toString());
      //   python.stdout.on('data', (data) => {
      //     console.log('data in');
      //     dataToSend = data.toString();
      //   });
      //   python.on('close', (code) => {
      //     console.log('close on');
      //     console.log(dataToSend);
      //     return dataToSend;
      //   });
      return python.stdout.toString();
    } catch (e) {
      console.error(e);
    }
  }
}
