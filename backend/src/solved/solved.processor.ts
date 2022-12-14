import { OnQueueActive, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import process from 'process';
import { HttpService } from '@nestjs/axios';

@Processor('gradeQueue')
export class GradeProcessor {
  constructor(private readonly httpService: HttpService) {}

  @OnQueueActive()
  handleGrade(job: Job) {
    console.log('job.data', job.data.foo);
    return this.httpService.axiosRef
      .post(process.env.GRADING_SERVER_URL)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
