import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AlertService, AlertRequest, AlertResponse } from './alert.service';

@Controller()
export class AlertController {
  private readonly logger = new Logger(AlertController.name);

  constructor(private readonly alertService: AlertService) {}

  @MessagePattern('generate_weather_alert')
  async generateWeatherAlert(@Payload() alertRequest: any): Promise<any> {
    this.logger.log('Procesando solicitud de alerta meteorológica:', alertRequest);
    // Redirigimos este patrón al nuevo flujo que procesa una alerta ya detectada
    return await this.alertService.processClimateAlert(alertRequest);
  }

  @MessagePattern('generate_frost_alert')
  async generateFrostAlert(@Payload() alertRequest: AlertRequest): Promise<AlertResponse> {
    this.logger.log('Procesando solicitud de alerta de helada:', alertRequest);
    return await this.alertService.generateFrostAlert(alertRequest);
  }

    @MessagePattern('process_climate_alert')
    async processClimateAlert(@Payload() alertData: any): Promise<any> {
      this.logger.log('Procesando alerta climática desde weather-service:', alertData);
      return await this.alertService.processClimateAlert(alertData);
    }

    @MessagePattern('get_active_alerts')
    async getActiveAlerts(): Promise<any> {
      this.logger.log('Obteniendo alertas activas');
      try {
        const alerts = await this.alertService.getActiveAlerts();
        return {
          success: true,
          message: 'Alertas activas obtenidas exitosamente',
          data: alerts
        };
      } catch (error) {
        this.logger.error('Error obteniendo alertas activas:', error);
        return {
          success: false,
          message: 'Error al obtener alertas activas',
          error: error.message
        };
      }
    }

    @MessagePattern('get_user_alerts')
    async getUserAlerts(@Payload() data: { userId: string }): Promise<any> {
      this.logger.log(`Obteniendo alertas del usuario: ${data.userId}`);
      try {
        const userAlerts = await this.alertService.getUserAlerts(data.userId);
        return {
          success: true,
          message: 'Alertas del usuario obtenidas exitosamente',
          data: userAlerts
        };
      } catch (error) {
        this.logger.error('Error obteniendo alertas del usuario:', error);
        return {
          success: false,
          message: 'Error al obtener alertas del usuario',
          error: error.message
        };
      }
    }

    @MessagePattern('mark_alert_read')
    async markAlertAsRead(@Payload() data: { userAlertId: string }): Promise<any> {
      this.logger.log(`Marcando alerta como leída: ${data.userAlertId}`);
      try {
        const userAlert = await this.alertService.markAlertAsRead(data.userAlertId);
        return {
          success: true,
          message: 'Alerta marcada como leída exitosamente',
          data: userAlert
        };
      } catch (error) {
        this.logger.error('Error marcando alerta como leída:', error);
        return {
          success: false,
          message: 'Error al marcar alerta como leída',
          error: error.message
        };
      }
    }
}