import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Response,
  UseInterceptors
} from "@nestjs/common";
import { DoorsService } from "./doors.service";
import { CreateDoorDto } from "./dto/create-door.dto";
import { UpdateDoorDto } from "./dto/update-door.dto";
import { UserRole } from "../users/entities/user.entity";

@Controller('doors')
@UseInterceptors(ClassSerializerInterceptor)
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @Get()
  async findAll() {
    return this.doorsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.doorsService.findOneById(uuid);
  }

  @Post()
  async create(@Req() req, @Response({ passthrough: true }) response, @Body() createDoorDto: CreateDoorDto) {
    // generate folders for return (important: it must happen before adding door to db)
    const zip = await this.doorsService.createZipRepo(createDoorDto);

    console.log(createDoorDto.ip + " " + createDoorDto.doorname)
    // add door to db
    await this.doorsService.create(createDoorDto, req.user).catch((err) => {
      console.log(err);
      return err;
    });

    // Set header, so that download dialog is automatically opened in frontend
    response.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="setup.zip',
    });

    // return config files for door
    response.send(await zip.generateAsync({ type: 'nodebuffer' }));
  }

  /*@Post()
  async create(@Req() req, @Res() response, @Body() createDoorDto: CreateDoorDto) {
    // generate folders for return (important: it must happen before adding door to db)
    const zip = await this.doorsService.createZipRepo(createDoorDto);
    // add door to db
    await this.doorsService.create(createDoorDto, req.user).catch((err) => {
      console.log(err);
      return err;
    });

    // Set header, so that download dialog is automatically opened in frontend
    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="setup.zip"',
    );

    // return config files for door
    return new StreamableFile(await zip.generateAsync({ type: 'nodebuffer' }));
  }*/

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateDoorDto: UpdateDoorDto, @Req() req) {
    return this.doorsService.update(uuid, updateDoorDto, req.user);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string, @Req() req) {
    return this.doorsService.remove(uuid, req.user);
  }
}
