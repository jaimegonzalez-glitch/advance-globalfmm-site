# Advance IA: Cloud Backup & Disaster Recovery Strategy

Para cumplir con los estándares de nivel empresarial, el ecosistema de **Advance** implementa la siguiente estrategia de respaldo dentro de Google Cloud.

## 1. Cloud SQL (Persistencia Relacional)
- **Automatización**: Snapshots diarios habilitados por defecto.
- **Retención**: 7 días de backups automáticos.
- **Point-in-Time Recovery (PITR)**: Habilitado mediante logs binarios, permitiendo restaurar la base de datos a un segundo específico en los últimos 7 días.
- **Redundancia**: Base de datos de alta disponibilidad (Regional) con failover automático a una zona secundaria.

## 2. Firestore (Datos de Tiempo Real e IoT)
- **Exportación Programada**: Uso de **Cloud Scheduler** para disparar una función de exportación total de colecciones cada 24 horas.
- **Destino**: Bucket de **Cloud Storage** con política de clase "Coldline" para optimización de costos.
- **Consistencia**: Garantizada a nivel de documento.

## 3. BigQuery (Data Lakehouse)
- **Table Snapshots**: Creación de snapshots de las tablas de entrenamiento de Vertex AI cada vez que se inicia un ciclo de re-entrenamiento.
- **Time Travel**: Capacidad nativa de BigQuery para consultar datos tal como estaban en cualquier momento de los últimos 7 días.

## 4. Disaster Recovery Plan (DRP)
En caso de fallo catastrófico en la región principal (`us-central1`):
1. **Infraestructura**: Despliegue automático de Cloud Run en la región secundaria (`us-east1`) vía Cloud Build.
2. **Datos**: Restauración del último backup cross-region desde Cloud Storage.
3. **DNS**: Conmutación de tráfico vía Global Load Balancer.

---
> [!NOTE]
> Esta estrategia asegura un **RPO (Recovery Point Objective)** de < 24h para configuraciones estándar y un **RTO (Recovery Time Objective)** de < 1h.
