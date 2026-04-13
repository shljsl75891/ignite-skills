## Capacity Estimation

#### Metric System

| Number     | Power           |
| ---------- | --------------- |
| 1 Thousand | 10<sup>3</sup>  |
| 1 Million  | 10<sup>6</sup>  |
| 1 Billion  | 10<sup>9</sup>  |
| 1 Trillion | 10<sup>12</sup> |

#### Powers of 2

| Power          | Value |
| -------------- | ----- |
| 2<sup>0</sup>  | 1     |
| 2<sup>1</sup>  | 2     |
| 2<sup>2</sup>  | 4     |
| 2<sup>3</sup>  | 8     |
| 2<sup>4</sup>  | 16    |
| 2<sup>5</sup>  | 32    |
| 2<sup>6</sup>  | 64    |
| 2<sup>7</sup>  | 128   |
| 2<sup>8</sup>  | 256   |
| 2<sup>9</sup>  | 512   |
| 2<sup>10</sup> | 1024  |
| 2<sup>11</sup> | 2048  |

> **Tip**: 2<sup>10</sup> ≈ 10<sup>3</sup> (1024 ≈ 1000). This is why 1 KB = 1024 bytes ≈ 1000 bytes. Quick mental math: 2<sup>20</sup> ≈ 10<sup>6</sup>, 2<sup>30</sup> ≈ 10<sup>9</sup>, 2<sup>40</sup> ≈ 10<sup>12</sup>.

#### Byte Units (Power of 10)

| Unit | Full Form | Bytes           |
| ---- | --------- | --------------- |
| KB   | Kilobyte  | 10<sup>3</sup>  |
| MB   | Megabyte  | 10<sup>6</sup>  |
| GB   | Gigabyte  | 10<sup>9</sup>  |
| TB   | Terabyte  | 10<sup>12</sup> |
| PB   | Petabyte  | 10<sup>15</sup> |
| EB   | Exabyte   | 10<sup>18</sup> |
| ZB   | Zettabyte | 10<sup>21</sup> |
| YB   | Yottabyte | 10<sup>24</sup> |

#### Types of Estimations

1. **Storage Estimation**: Calculating the total disk/memory space needed to store data over a given period. Helps decide how many servers, disks, or DB shards are needed.

2. **Bandwidth Estimation**: Calculating the network traffic (data transferred) per second — both incoming (ingress) and outgoing (egress). Helps decide network capacity, load balancer sizing, and CDN requirements.

> [!TIP]
> Always do estimates in powers of 10 (not exact numbers) for easier mental math. Tell the interviewer — "I'm rounding to powers of 10 for simplicity, the goal is to get the right order of magnitude, not exact numbers."

#### DAU and MAU

- **DAU (Daily Active Users)**: Unique users who interact with the system in a single day.
- **MAU (Monthly Active Users)**: Unique users who interact with the system in a 30-day period.

#### Quick Conversion: Daily → Per Second

1 day = 24 × 60 × 60 = 86,400 ≈ **10<sup>5</sup>** seconds

So, **1 Million (10<sup>6</sup>) / day ≈ 10<sup>6</sup> / 24 (hrs) \* 3600 (secs) ≈ 12/sec** .

#### Retention Period

- **5 years** is the industry standard for data retention planning.
- 365 days × 5 = 1825 ≈ **2000 days** (rounded up for easier mental math with powers of 10).
