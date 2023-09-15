import { FCM } from "@capacitor-community/fcm"
import { Capacitor } from "@capacitor/core"
import {
  PushNotifications,
  PushNotificationSchema,
  Token,
} from "@capacitor/push-notifications"
import { error } from "console"

export default class PushNotification {
  private register: (token: string) => Promise<void>
  private onNotificationReceived: (data: any) => Promise<void>

  constructor(opts: {
    register: (token: string) => Promise<void>
    onNotificationReceived: (data: any) => Promise<void>
  }) {
    this.register = opts.register
    this.onNotificationReceived = opts.onNotificationReceived
  }

  public async init() {
    const platform = Capacitor.getPlatform()

    if (platform === "web") return

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android and web will just grant without prompting
    const permStatus = await PushNotifications.requestPermissions()

    if (permStatus.receive !== "granted") {
      console.warn("PushNotification permission refused")
      return
    }

    PushNotifications.addListener("registration", async ({ value }) => {
      let token

      // Get FCM token instead the APN one returned by Capacitor
      if (platform === "ios") {
        const { token: fcm_token } = await FCM.getToken()
        token = fcm_token
      } else if (platform === "android") {
        token = value
      } else {
        throw new Error(`Unsupported platform "${platform}"`)
      }

      await this.register(token)
      console.log("PushNotification initialized")
    })

    await PushNotifications.addListener("registrationError", (err) => {
      console.error("Registration error: ", err.error)
    })

    await PushNotifications.addListener(
      "pushNotificationReceived",
      async (notification) => {
        await this.onNotificationReceived(notification)
      }
    )

    await PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        console.log(
          "Push notification action performed",
          notification.actionId,
          notification.inputValue
        )
      }
    )

    await PushNotifications.register()
  }
}
